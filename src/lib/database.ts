import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.resolve('./credits.db');
const db = new Database(DB_PATH);

// Criar tabelas se não existirem
db.exec(`
  CREATE TABLE IF NOT EXISTS credits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    credits_remaining INTEGER NOT NULL DEFAULT 0,
    total_purchased INTEGER NOT NULL DEFAULT 0,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    package_type TEXT NOT NULL,
    credits_purchased INTEGER NOT NULL,
    amount_paid REAL NOT NULL,
    stripe_payment_intent_id TEXT,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES credits (email)
  );

  CREATE TABLE IF NOT EXISTS generation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    niche TEXT NOT NULL,
    pdf_title TEXT,
    generation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES credits (email)
  );
`);

// Interface para os tipos de dados
export interface CreditRecord {
  id: number;
  email: string;
  credits_remaining: number;
  total_purchased: number;
  purchase_date: string;
  last_updated: string;
}

export interface PurchaseRecord {
  id: number;
  email: string;
  package_type: string;
  credits_purchased: number;
  amount_paid: number;
  stripe_payment_intent_id?: string;
  purchase_date: string;
}

export interface GenerationRecord {
  id: number;
  email: string;
  niche: string;
  pdf_title?: string;
  generation_date: string;
}

// Funções para gerenciar créditos
export const creditsDB = {
  // Buscar créditos de um usuário
  getCredits: (email: string): CreditRecord | null => {
    const stmt = db.prepare('SELECT * FROM credits WHERE email = ?');
    return stmt.get(email) as CreditRecord | null;
  },

  // Adicionar créditos para um usuário
  addCredits: (email: string, credits: number, packageType: string, amountPaid: number, stripePaymentIntentId?: string) => {
    const existingUser = creditsDB.getCredits(email);
    
    if (existingUser) {
      // Atualizar créditos existentes
      const updateStmt = db.prepare(`
        UPDATE credits 
        SET credits_remaining = credits_remaining + ?, 
            total_purchased = total_purchased + ?,
            last_updated = CURRENT_TIMESTAMP
        WHERE email = ?
      `);
      updateStmt.run(credits, credits, email);
    } else {
      // Criar novo registro
      const insertStmt = db.prepare(`
        INSERT INTO credits (email, credits_remaining, total_purchased)
        VALUES (?, ?, ?)
      `);
      insertStmt.run(email, credits, credits);
    }

    // Registrar a compra
    const purchaseStmt = db.prepare(`
      INSERT INTO purchases (email, package_type, credits_purchased, amount_paid, stripe_payment_intent_id)
      VALUES (?, ?, ?, ?, ?)
    `);
    purchaseStmt.run(email, packageType, credits, amountPaid, stripePaymentIntentId);
  },

  // Decrementar créditos após geração
  useCredit: (email: string, niche: string, pdfTitle?: string): boolean => {
    const user = creditsDB.getCredits(email);
    
    if (!user || user.credits_remaining <= 0) {
      return false; // Sem créditos suficientes
    }

    // Decrementar crédito
    const updateStmt = db.prepare(`
      UPDATE credits 
      SET credits_remaining = credits_remaining - 1,
          last_updated = CURRENT_TIMESTAMP
      WHERE email = ?
    `);
    updateStmt.run(email);

    // Registrar geração
    const historyStmt = db.prepare(`
      INSERT INTO generation_history (email, niche, pdf_title)
      VALUES (?, ?, ?)
    `);
    historyStmt.run(email, niche, pdfTitle);

    return true;
  },

  // Buscar histórico de compras
  getPurchaseHistory: (email: string): PurchaseRecord[] => {
    const stmt = db.prepare('SELECT * FROM purchases WHERE email = ? ORDER BY purchase_date DESC');
    return stmt.all(email) as PurchaseRecord[];
  },

  // Buscar histórico de gerações
  getGenerationHistory: (email: string): GenerationRecord[] => {
    const stmt = db.prepare('SELECT * FROM generation_history WHERE email = ? ORDER BY generation_date DESC');
    return stmt.all(email) as GenerationRecord[];
  }
};

export default db;
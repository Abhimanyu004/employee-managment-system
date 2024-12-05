import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { first_name, second_name, emp_id, email, phone_no, dept, doj, role } = body;

        if (!first_name || !second_name || !emp_id || !email || !phone_no || !dept || !doj || !role) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const [result] = await pool.query(
            `INSERT INTO employees (first_name, second_name, emp_id, email, phone_no, dept, doj, role) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, second_name, emp_id, email, phone_no, dept, doj, role]
        );
        
        return NextResponse.json({ message: 'Employee added successfully', result });
    } catch (e) {
        console.error('Error inserting into database:', e);
        return NextResponse.json({ error: `Error occurred: ${e.message}` }, { status: 500 });
    }
}

export function GET(req: NextRequest) {
    return NextResponse.json({ message: 'Hello' });
}

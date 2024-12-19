import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../db';
import { formSchema } from '@/schemas/formSchema';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validationResult = formSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        const { first_name, second_name, emp_id, email, phone_no, dept, doj, role } = validationResult.data;
        await pool.query(`
            CREATE TABLE IF NOT EXISTS employees (
        first_name VARCHAR(255) NOT NULL,
        second_name VARCHAR(255) NOT NULL,
        emp_id VARCHAR(10) NOT NULL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_no CHAR(10) NOT NULL,
        dept ENUM('HR', 'Engineering', 'Marketing', 'Finance', 'Sales') NOT NULL,
        doj DATE NOT NULL,
        role VARCHAR(100) NOT NULL 
      );`
        )
        const [result] = await pool.query(
            `INSERT INTO employees (first_name, second_name, emp_id, email, phone_no, dept, doj, role) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, second_name, emp_id, email, phone_no, dept, doj, role]
        );
        return NextResponse.json({ message: 'Employee added successfully', result });

    } catch (e: any) {
        console.error('Error inserting into database:', e);
        return NextResponse.json({ error: `Error occurred: ${e.message}` }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    const usersCollection = await getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);
    const result = await usersCollection.insertOne({
      email,
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const token = generateToken(result.insertedId.toString());

    return NextResponse.json(
      {
        message: 'User registered successfully',
        token,
        user: { id: result.insertedId, email, username },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

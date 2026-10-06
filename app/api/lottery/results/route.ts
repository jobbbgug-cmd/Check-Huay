import { NextRequest, NextResponse } from 'next/server';
import { getLotteryCollection } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    const lotteryCollection = await getLotteryCollection();

    const results = await lotteryCollection
      .find({})
      .sort({ drawDate: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await lotteryCollection.countDocuments();

    return NextResponse.json({
      results,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Lottery results error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

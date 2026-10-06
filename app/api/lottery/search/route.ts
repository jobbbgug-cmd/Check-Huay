import { NextRequest, NextResponse } from 'next/server';
import { getLotteryCollection } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const ticketNumber = searchParams.get('ticket');

    if (!ticketNumber) {
      return NextResponse.json(
        { error: 'Ticket number is required' },
        { status: 400 }
      );
    }

    const lotteryCollection = await getLotteryCollection();

    const results = await lotteryCollection
      .find({
        $or: [
          { firstPrize: ticketNumber },
          { secondPrize: { $in: [ticketNumber] } },
          { thirdPrize: { $in: [ticketNumber] } },
          { fourthPrize: { $in: [ticketNumber] } },
          { fifthPrize: { $in: [ticketNumber] } },
          { nearFirstPrize: { $in: [ticketNumber] } },
          { runningNumber: { $in: [ticketNumber] } },
        ],
      })
      .toArray();

    return NextResponse.json({
      ticketNumber,
      results,
      found: results.length > 0,
    });
  } catch (error) {
    console.error('Lottery search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

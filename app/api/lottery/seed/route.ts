import { NextRequest, NextResponse } from 'next/server';
import { getLotteryCollection } from '@/lib/mongodb';

const sampleLotteryData = [
  {
    drawDate: '2026-10-06',
    drawNumber: '16260',
    firstPrize: '123456',
    secondPrize: ['234567', '345678'],
    thirdPrize: ['456789', '567890', '678901'],
    fourthPrize: ['789012', '890123', '901234', '012345'],
    fifthPrize: ['234501', '345601', '456701', '567801', '678901'],
    nearFirstPrize: ['123455', '123457'],
    runningNumber: ['111111', '222222', '333333', '444444', '555555'],
  },
  {
    drawDate: '2026-09-06',
    drawNumber: '16250',
    firstPrize: '654321',
    secondPrize: ['754321', '854321'],
    thirdPrize: ['954321', '054321', '154321'],
    fourthPrize: ['254321', '354321', '454321', '554321'],
    fifthPrize: ['654320', '654325', '654330', '654335', '654340'],
    nearFirstPrize: ['654322', '654323'],
    runningNumber: ['666666', '777777', '888888', '999999', '000000'],
  },
  {
    drawDate: '2026-08-06',
    drawNumber: '16240',
    firstPrize: '999999',
    secondPrize: ['888888', '777777'],
    thirdPrize: ['666666', '555555', '444444'],
    fourthPrize: ['333333', '222222', '111111', '000000'],
    fifthPrize: ['100001', '200002', '300003', '400004', '500005'],
    nearFirstPrize: ['999998', '000000'],
    runningNumber: ['123123', '456456', '789789', '456123', '789456'],
  },
];

export async function POST(req: NextRequest) {
  try {
    const lotteryCollection = await getLotteryCollection();

    // Clear existing data
    await lotteryCollection.deleteMany({});

    // Insert sample data
    const result = await lotteryCollection.insertMany(sampleLotteryData);

    return NextResponse.json(
      {
        message: 'Lottery data seeded successfully',
        insertedCount: result.insertedIds.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

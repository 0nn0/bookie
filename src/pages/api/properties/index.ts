import { Prisma, PrismaClient } from '@prisma/client';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    const response = await prisma.guests_owners.findMany({
      include: {
        properties: true,
      },
      where: {
        profile_id: session.user.id,
      },
    });

    res.status(200).json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({ statusCode: e.code, message: e.message });
    }
  }
};

export default handler;

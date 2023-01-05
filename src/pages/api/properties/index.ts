import {
  Session,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

const fetchProperties = async (session: Session) => {
  return await prisma.guests_owners.findMany({
    include: {
      properties: true,
    },
    where: {
      profile_id: session.user.id,
    },
  });
};

export type PropertiesByUser = Prisma.PromiseReturnType<typeof fetchProperties>;

// const a: PropertiesByUser = [
//   {
//     id: '1',
//     created_at: new Date(),
//     profile_id: '1',
//     property_id: '1',
//     role: 'owner',
//     updated_at: new Date(),
//     properties: {
//       id: '1',
//       name: 'a',
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//   },
// ];

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
    const response = await fetchProperties(session);

    res.status(200).json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({ statusCode: e.code, message: e.message });
    }
  }
};

export default handler;

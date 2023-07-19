import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { bugValidationSchema } from 'validationSchema/bugs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.bug
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBugById();
    case 'PUT':
      return updateBugById();
    case 'DELETE':
      return deleteBugById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBugById() {
    const data = await prisma.bug.findFirst(convertQueryToPrismaUtil(req.query, 'bug'));
    return res.status(200).json(data);
  }

  async function updateBugById() {
    await bugValidationSchema.validate(req.body);
    const data = await prisma.bug.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBugById() {
    const data = await prisma.bug.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

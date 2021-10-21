import prismaClient from "../prisma";

class ProfileUserService {
  async execute(user_Id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_Id,
      },
    });

    return user;
  }
}

export {ProfileUserService};

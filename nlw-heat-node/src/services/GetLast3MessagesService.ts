import prismaClient from "../prisma";

class GetLast3MessagesService {
  async execute() {
    const message = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },

      include: {
        user: true,
      },

      // comando no para o banco de dados pegar somente 3 valores no caso as messsagens
      // SELECT * FROM MENSSAGES LIMIT 3 ORDER BY CREATED_AT DESC
    });

    return message;
  }
}

export { GetLast3MessagesService };

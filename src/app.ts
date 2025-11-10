import {envs} from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo/index";
import { PrismaClient } from "./generated/prisma/client";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // * Crear una colección

    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low',
    // })

    // await newLog.save();

    // console.log(newLog);

    // * Obtener entradas

    // const logs = await LogModel.find();

    // console.log(logs);

    // * Prisma

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'MEDIUM',
    //         message: 'Test message desde Prisma',
    //         origin: 'App.ts',
    //     }
    // });

    // console.log({newLog});

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM',
    //     }
    // });

    // console.log({logs});

    Server.start();
    
}
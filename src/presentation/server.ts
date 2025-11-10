import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-mutiple"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from './email/email.service'

const fslogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log('Server started...');

        // * Mandar mail

        // emailService.sendEmail({
        //     to: 'francolucianomagnano@hotmail.com',
        //     subject: 'testing email service',
        //     htmlBody: `
        //     <h1>testing</h1>
        //     <br>
        //     <h2>email service</h2>
        //     <p>Lorem Ipsum</p>
        //     `
        // })

        // * Mandar con archivos adjuntos

        // new SendEmailLogs(emailService, logRepository).execute('francolucianomagnano@hotmail.com')
        
        // * Ejemplo cron checkService
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                // new CheckService().execute('https://www.google.com');
                new CheckServiceMultiple(
                    [fslogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is success`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );

    }

}
import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"
import path from "path";

const fileName = path.basename(__filename);

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {}

    async execute( to: string | string[]) {

        try {
            const sent = this.emailService.sendEmailWithFileSystemLogs(to);
            if ( !sent ) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Log email sent`,
                origin: fileName
            });
            this.logRepository.saveLog(log);

            return true
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: fileName
            });
            this.logRepository.saveLog(log);
            return false
        }

        return true
    }
}
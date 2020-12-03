import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`Config error missing env ${key}.`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.getValue('DB_HOST'),
            port: parseInt(this.getValue('DB_PORT')),
            username: this.getValue('DB_USERNAME'),
            password: this.getValue('DB_PASSWORD'),
            database: this.getValue('DB_DATABASE'),
            entities: ["**/*.entity{.ts,.js}"],
            migrationsTableName: 'migrations',
            migrations: ['src/App/migrations/*.ts'],
            cli: {
                migrationsDir: 'src/App/migrations',
            },
            ssl: this.isProduction()
        };
    }
}

const configService = new ConfigService(process.env)
    .ensureValues([
        'DB_HOST',
        'DB_PORT',
        'DB_USERNAME',
        'DB_PASSWORD',
        'DB_DATABASE'
    ]);

export { configService };
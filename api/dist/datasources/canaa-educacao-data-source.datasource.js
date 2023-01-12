"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanaaEducacaoDataSourceDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'GameDataSource',
    connector: 'memory',
    localStorage: '',
    file: './src/datasources/db.json',
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let CanaaEducacaoDataSourceDataSource = class CanaaEducacaoDataSourceDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
CanaaEducacaoDataSourceDataSource.dataSourceName = 'GameDataSource';
CanaaEducacaoDataSourceDataSource.defaultConfig = config;
CanaaEducacaoDataSourceDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.GameDataSource', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], CanaaEducacaoDataSourceDataSource);
exports.CanaaEducacaoDataSourceDataSource = CanaaEducacaoDataSourceDataSource;
//# sourceMappingURL=canaa-educacao-data-source.datasource.js.map
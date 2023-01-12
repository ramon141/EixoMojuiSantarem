"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PlayerRepository = class PlayerRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Player, dataSource);
    }
};
PlayerRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.GameDataSource')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.CanaaEducacaoDataSourceDataSource])
], PlayerRepository);
exports.PlayerRepository = PlayerRepository;
//# sourceMappingURL=player.repository.js.map
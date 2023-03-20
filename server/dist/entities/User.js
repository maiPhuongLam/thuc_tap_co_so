"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Sex = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
var Sex;
(function (Sex) {
    Sex["MALE"] = "male";
    Sex["FEMALE"] = "female";
    Sex["OTHER"] = "other";
})(Sex = exports.Sex || (exports.Sex = {}));
const Comment_1 = require("./Comment");
const Like_1 = require("./Like");
const Post_1 = require("./Post");
const Message_1 = require("./Message");
let User = User_1 = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(6),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(6),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "coverPicture", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "livesin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Sex }),
    __metadata("design:type", String)
], User.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Post_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => User_1, user => user.following),
    (0, typeorm_1.JoinTable)({
        name: 'follows',
        joinColumn: {
            name: 'following',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'follower',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => User_1, user => user.followers),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, comment => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Like_1.Like, like => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, message => message.sender),
    __metadata("design:type", Array)
], User.prototype, "messagesSend", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, message => message.receiver),
    __metadata("design:type", Array)
], User.prototype, "messageReceiver", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedDate", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;

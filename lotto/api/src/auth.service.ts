import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService) {}

    async validateUserById(userId: string){
        return null;
    }
    async login(user: any){
        const payload = { sub: user.id, username: user.user};
        return{
            access_token: this.jwtService.sign(payload),
        };
    }
}
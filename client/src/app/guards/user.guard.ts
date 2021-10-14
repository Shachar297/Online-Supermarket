import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

    public constructor(private router: Router) {}

    public canActivate(): boolean {
        
        if(sessionStorage.getItem("userType")) {
            return true;
        }

        this.router.navigateByUrl("/login");
        alert("Access Denied , Please login to commit this action.");
        return false;
    }

}

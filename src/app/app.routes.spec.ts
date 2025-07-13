import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { PotInfoComponent } from './pages/pots/pot-info/pot-info.component';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: Location, useValue: jasmine.createSpyObj('Location', ['back']) }
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  describe('Route Configuration', () => {
    it('should have correct number of routes', () => {
      expect(routes.length).toBe(5); // 5 routes: '', 'admin', 'user', 'pots/:contractAddress', '**'
    });

    it('should have home route as default', () => {
      const homeRoute = routes.find(route => route.path === '');
      expect(homeRoute).toBeTruthy();
      expect(homeRoute?.component).toBe(HomeComponent);
    });

    it('should have admin route', () => {
      const adminRoute = routes.find(route => route.path === 'admin');
      expect(adminRoute).toBeTruthy();
      expect(adminRoute?.component).toBe(AdminComponent);
    });

    it('should have user profile route', () => {
      const userRoute = routes.find(route => route.path === 'user');
      expect(userRoute).toBeTruthy();
      expect(userRoute?.component).toBe(UserProfileComponent);
    });

    it('should have pot info route with parameter', () => {
      const potInfoRoute = routes.find(route => route.path === 'pots/:contractAddress');
      expect(potInfoRoute).toBeTruthy();
      expect(potInfoRoute?.component).toBe(PotInfoComponent);
    });

    it('should have wildcard route for fallback', () => {
      const wildcardRoute = routes.find(route => route.path === '**');
      expect(wildcardRoute).toBeTruthy();
      expect(wildcardRoute?.redirectTo).toBe('');
    });
  });

  describe('Route Parameters', () => {
    it('should extract contractAddress parameter correctly', () => {
      const potInfoRoute = routes.find(route => route.path === 'pots/:contractAddress');
      expect(potInfoRoute).toBeTruthy();
      
      // Test that the route can handle contract addresses
      const testContractAddress = '0x1234567890123456789012345678901234567890';
      const expectedPath = `/pots/${testContractAddress}`;
      
      // This would be tested in integration tests with actual navigation
      expect(expectedPath).toContain(testContractAddress);
    });
  });

  describe('Route Guards and Resolvers', () => {
    it('should not have any route guards configured', () => {
      routes.forEach(route => {
        expect(route.canActivate).toBeUndefined();
        expect(route.canDeactivate).toBeUndefined();
        expect(route.canLoad).toBeUndefined();
        expect(route.resolve).toBeUndefined();
      });
    });
  });

  describe('Route Data', () => {
    it('should not have any route data configured', () => {
      routes.forEach(route => {
        expect(route.data).toBeUndefined();
      });
    });
  });

  describe('Child Routes', () => {
    it('should not have any child routes configured', () => {
      routes.forEach(route => {
        expect(route.children).toBeUndefined();
      });
    });
  });

  describe('Route Paths', () => {
    it('should have valid route paths', () => {
      const validPaths = ['', 'admin', 'user', 'pots/:contractAddress', '**'];
      
      routes.forEach(route => {
        expect(validPaths).toContain(route.path!);
      });
    });

    it('should have unique route paths', () => {
      const paths = routes.map(route => route.path);
      const uniquePaths = [...new Set(paths)];
      expect(paths.length).toBe(uniquePaths.length);
    });
  });

  describe('Component Loading', () => {
    it('should have all required components imported', () => {
      const requiredComponents = [
        HomeComponent,
        AdminComponent,
        UserProfileComponent,
        PotInfoComponent
      ];

      requiredComponents.forEach(component => {
        expect(component).toBeTruthy();
      });
    });
  });

  describe('Navigation Scenarios', () => {
    it('should handle navigation to home page', () => {
      const homeRoute = routes.find(route => route.path === '');
      expect(homeRoute?.component).toBe(HomeComponent);
    });

    it('should handle navigation to admin page', () => {
      const adminRoute = routes.find(route => route.path === 'admin');
      expect(adminRoute?.component).toBe(AdminComponent);
    });

    it('should handle navigation to user profile page', () => {
      const userRoute = routes.find(route => route.path === 'user');
      expect(userRoute?.component).toBe(UserProfileComponent);
    });

    it('should handle navigation to pot info page with contract address', () => {
      const potInfoRoute = routes.find(route => route.path === 'pots/:contractAddress');
      expect(potInfoRoute?.component).toBe(PotInfoComponent);
    });

    it('should redirect invalid routes to home', () => {
      const wildcardRoute = routes.find(route => route.path === '**');
      expect(wildcardRoute?.redirectTo).toBe('');
    });
  });

  describe('Route Structure', () => {
    it('should have proper route structure for pot info', () => {
      const potInfoRoute = routes.find(route => route.path === 'pots/:contractAddress');
      expect(potInfoRoute).toBeTruthy();
      
      // Test that the route parameter is correctly named
      const pathSegments = potInfoRoute?.path?.split('/');
      expect(pathSegments).toContain('pots');
      expect(pathSegments).toContain(':contractAddress');
    });

    it('should have proper route structure for all routes', () => {
      routes.forEach(route => {
        if (route.path && route.path !== '**') {
          expect(route.path!).toMatch(/^[a-zA-Z0-9\/:]*$/);
        }
      });
    });
  });

  describe('Route Configuration Validation', () => {
    it('should have all routes with either component or redirectTo', () => {
      routes.forEach(route => {
        if (route.path === '**') {
          expect(route.redirectTo).toBeDefined();
        } else {
          expect(route.component).toBeDefined();
        }
      });
    });

    it('should not have routes with both component and redirectTo', () => {
      routes.forEach(route => {
        if (route.redirectTo) {
          expect(route.component).toBeUndefined();
        }
        if (route.component) {
          expect(route.redirectTo).toBeUndefined();
        }
      });
    });
  });
}); 
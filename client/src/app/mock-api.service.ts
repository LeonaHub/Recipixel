import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class MockApiService implements InMemoryDbService {
  private SECRET_KEY = 'your-secret-key';

  createDb() {
    const users = [
      {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
      },
      {
        id: 2,
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2',
      },
    ];

    const recipes = [
      {
        id: 1,
        name: 'Pasta',
        ingredients: ['Pasta', 'Tomato Sauce', 'Cheese'],
        instructions: 'Cook pasta, add sauce and cheese.',
      },
      {
        id: 2,
        name: 'Salad',
        ingredients: ['Lettuce', 'Tomato', 'Cucumber'],
        instructions: 'Chop vegetables and mix.',
      },
    ];

    return { users, recipes };
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'login') {
      return this.authenticate(reqInfo);
    }
    if (reqInfo.collectionName === 'register') {
      return this.register(reqInfo);
    }
    if (reqInfo.collectionName === 'refresh-token') {
      return this.refreshToken(reqInfo);
    }
    return undefined; // let the default POST handle all others
  }

  private authenticate(reqInfo: RequestInfo) {
    const { username, password } = reqInfo.utils.getJsonBody(reqInfo.req);
    const users = reqInfo.collection as any[];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const token = this.generateToken(user);
      const refreshToken = this.generateRefreshToken(user);
      return reqInfo.utils.createResponse$(() => ({
        status: 200,
        body: { user: { ...user, password: undefined }, token, refreshToken },
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        status: 401,
        body: { message: 'Invalid username or password' },
      }));
    }
  }

  private refreshToken(reqInfo: RequestInfo) {
    const { refreshToken } = reqInfo.utils.getJsonBody(reqInfo.req);
    try {
      const decoded = jwt.verify(refreshToken, this.SECRET_KEY) as any;
      const users = reqInfo.collection as any[];
      const user = users.find((u) => u.id === decoded.id);

      if (user) {
        const newToken = this.generateToken(user);
        return reqInfo.utils.createResponse$(() => ({
          status: 200,
          body: { token: newToken },
        }));
      }
    } catch (error) {
      // Invalid refresh token
    }

    return reqInfo.utils.createResponse$(() => ({
      status: 401,
      body: { message: 'Invalid refresh token' },
    }));
  }

  private generateToken(user: any): string {
    return jwt.sign({ id: user.id, username: user.username }, this.SECRET_KEY, {
      expiresIn: '15m',
    });
  }

  private generateRefreshToken(user: any): string {
    return jwt.sign({ id: user.id }, this.SECRET_KEY, { expiresIn: '7d' });
  }

  private register(reqInfo: RequestInfo) {
    const { username, email, password } = reqInfo.utils.getJsonBody(
      reqInfo.req
    );
    const users = reqInfo.collection as any[];

    // Check if user already exists
    if (users.find((u) => u.username === username || u.email === email)) {
      return reqInfo.utils.createResponse$(() => ({
        status: 400,
        body: { message: 'User already exists' },
      }));
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password, // In a real app, you would hash this password
    };
    users.push(newUser);

    // Generate tokens
    const token = this.generateToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);

    return reqInfo.utils.createResponse$(() => ({
      status: 201,
      body: { user: { ...newUser, password: undefined }, token, refreshToken },
    }));
  }
}

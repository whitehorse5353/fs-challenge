import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { User, Organisation, Gists } from './vcs.interface';

@Injectable()
export class VcsService {
  constructor(private httpService: HttpService) {}

  getUserProfile<T>(username: T): Observable<User> {
    return this.httpService
      .get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization:
            'Bearer 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',
        },
      })
      .pipe(
        map((response): User => {
          const { name, id, company, location, email, avatar_url } =
            response.data;
          return {
            name,
            id,
            company,
            location,
            email,
            avatar_url,
          };
        }),
      );
  }

  getUserOrganisations<T>(username: T): Observable<Organisation[]> {
    return this.httpService
      .get(`https://api.github.com/users/${username}/orgs`, {
        headers: {
          Authorization:
            'Bearer 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',
        },
      })
      .pipe(
        map((organisations) =>
          organisations.data.map((organisation: Organisation): Organisation => {
            const { login, description, url, avatar_url } = organisation;
            return {
              login,
              description,
              url,
              avatar_url,
            };
          }),
        ),
      );
  }

  getUserGists<T>(username: T): Observable<Gists[]> {
    return this.httpService
      .get(`https://api.github.com/users/${username}/gists`, {
        headers: {
          Authorization:
            'Bearer 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',
        },
      })
      .pipe(
        map((response) => {
          return response.data.map((gists): Gists => {
            const { id, files, html_url } = gists;
            const transformedFiles = [];
            for (const [key, value] of Object.entries(files)) {
              transformedFiles.push({
                [key]: value,
              });
            }
            return { id, files: transformedFiles, html_url };
          });
        }),
      );
  }
}

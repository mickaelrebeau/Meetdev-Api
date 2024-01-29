export class UserDto {
  name: string;
  email: string;
  password: string;
  bio: string;
  country: string;
  post: string;
  company: string;
  github_url: string;
  portfolio_url: string;
  languages: string[];
  filters: Filters;
  avatar: File;
}

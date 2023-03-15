export interface User {
  name: string;
  company: string;
  location: string;
  email: string;
  avatar_url: string;
  id: number;
}

export interface Organisation {
  login: string;
  description: string;
  url: string;
  avatar_url: string;
}

export interface Gists {
  id: number;
  files: Files[];
  html_url: string;
}

interface Files {
  filename: string;
  language: string | null;
  type: string;
  raw_url: string;
  size: number;
}

import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface artist {
  id: number;
  name: string;
}

class artistRepository {
  async ReadAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * from artist");
    return rows as artist[];
  }

  async read(name: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from artist where name=?",
      [name],
    );
    return rows[0] as artist;
  }

  async create(name: string) {
    const [result] = await databaseClient.query<Result>(
      "insert into artist (name) values (?)",
      [name],
    );

    return result.insertId;
  }
}

export default new artistRepository();

import instance from './instance';

export const api = {
  async fetchDoc() {
    try {
      const doc1 = async () => await instance.get(
        `/documents1 `,
      )
      const doc2 = async () => await instance.get(
        `/documents2`,
      )
      const [resDoc1,resDoc2] = await Promise.all([doc1(), doc2()]).then((res) => {
        return res
      })
      return [...resDoc1.data,...resDoc2.data]
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },

  async sendDoc(obj: string[]) {
    try {
      const {data} = await instance.post(
        `/cancel`, obj
      );

      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
};

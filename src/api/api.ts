import instance from './instance';

export const api = {
  async fetchDoc() {
    let resDoc1: any, resDoc2: any;
    try {
      const doc1 = async () => await instance.get(
        `/documents1 `,
      )
      const doc2 = async () => await instance.get(
        `/documents2`,
      )
      await Promise.all([doc1(), doc2()]).then((res) => {
        [resDoc1, resDoc2] = res;

      })
      return [...resDoc1.data, ...resDoc2.data]
    } catch (e: any) {
      console.log(e.message);
    }
  },

  async sendDoc(obj: string[] ) {
    try {
      const {data} = await instance.post(
        `/cancel`, obj
      );

      return data;
    } catch (e: any) {
      console.log(e.message);
    }
  },
};

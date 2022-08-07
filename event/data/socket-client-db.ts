interface hashMapInterface {
  ids: string[];
}

const hashMap = new Map<string, hashMapInterface>();

export const addData = (chanal: string, id: string) => {
  try {
    const chanals = hashMap.get(chanal);
    if (chanals?.ids?.length) {
      hashMap.set(chanal, { ids: [...chanals?.ids, id] });
    } else {
      hashMap.set(chanal, { ids: [id] });
    }
  } catch (err: any) {
    console.log(err?.message);
  }
};

export const getData = (chanal: string) => {
  try {
    const chanals = hashMap.get(chanal);
    if (chanals?.ids?.length) {
      return chanals.ids;
    } else {
      return [];
    }
  } catch (err: any) {
    console.log(err?.message);
  }
};

const data = getData("hiiiii");

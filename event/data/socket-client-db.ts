import { publisherType, listerType } from "../../types/chanale-types";

interface hashMapInterface {
  publisher?: string[];
  lister?: string[];
}

const hashMap = new Map<string, hashMapInterface>();

export const addData = (chanal: string, id: string, type: string) => {
  try {
    const chanals = hashMap.get(chanal);

    if (!chanals) {
      if (type == publisherType) {
        hashMap.set(chanal, { publisher: [id], lister: [] });
      }

      if (type == listerType) {
        hashMap.set(chanal, { publisher: [], lister: [id] });
      }
    } else {
      if (type == publisherType) {
        const publisherSocketId = chanals.publisher;
        publisherSocketId?.push(id);
        hashMap.set(chanal, {
          publisher: publisherSocketId,
          lister: chanals.lister || [],
        });
      }

      if (type == listerType) {
        const listerSocketId = chanals.lister;
        listerSocketId?.push(id);
        hashMap.set(chanal, {
          publisher: chanals.publisher || [],
          lister: listerSocketId,
        });
      }
    }
  } catch (err: any) {
    console.log(err?.message);
  }
};
export const removeData = (chanal: string, id: string, type: string) => {
  try {
    const chanals = hashMap.get(chanal);
    if (!chanals) return;

    if (type == publisherType) {
      const data = chanals?.publisher?.filter((val, i) => val != id);
      hashMap.set(chanal, { publisher: data, lister: chanals.lister });
    } else if (type == listerType) {
      const data = chanals?.lister?.filter((val, i) => val != id);
      hashMap.set(chanal, {
        publisher: chanals.publisher,
        lister: data,
      });
    }
  } catch (err: any) {
    console.log(err?.message);
  }
};

export const getData = (chanal: string, type: string) => {
  try {
    const chanals = hashMap.get(chanal);

    if (type == publisherType) {
      return chanals?.publisher || [];
    } else if (type == listerType) {
      return chanals?.lister || [];
    }
    return [];
  } catch (err: any) {
    console.log(err?.message);
  }
};

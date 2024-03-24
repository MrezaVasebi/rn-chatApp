import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

interface IResult {
  msg: string;
  status: boolean;
}

/** Reference: https://rnfirebase.io/firestore/usage */

export class Firestore {
  private _result: IResult = {
    msg: "",
    status: false,
  };

  async onCreateCollectionAndDoc(
    collectionName: string,
    fields: object
  ): Promise<IResult> {
    // 1. create the collection
    // 2. create document with id
    // 3. add fields to documents

    try {
      await firestore()
        .collection(collectionName)
        .add(fields)
        .then((response) => {
          // console.log("26 in firestore class: ", { response });
          this.setResult("Collection and document created successfully.", true);
        })
        .catch((error) => {
          // console.log("33 in firestore class: ", { error });
          this.setResult("Error in creating collection and document.");
        });
    } catch (error) {
      // console.log({ error });
    }
    return this.getResult();
  }

  async onCreateCollectionWithDocId(
    collectionName: string,
    docId: string,
    fields: object
  ): Promise<IResult> {
    // 1. create the collection
    // 2. create doc with specific id
    // 3. add fields to doc

    try {
      await firestore()
        .collection(collectionName) // collection name
        .doc(docId) // doc id
        .set(fields) // doc fields
        .then((response) => {
          // console.log(JSON.stringify(response, null, 2));
          this.setResult(
            "Collection and doc with specific id created successfully.",
            true
          );
        })
        .catch((error) => {
          // console.log("Error in creating collection and doc with specific id",error);
          this.setResult(
            "Error in creating collection and doc with specific id."
          );
        });
    } catch (error) {
      // console.log({ error });
    }

    return this.getResult();
  }

  async onDeleteCollection(collectionName: string): Promise<IResult> {
    try {
      // get all docs of collection
      let getDocs = await firestore().collection(collectionName).get();

      // it means there is no document inside collection.
      if (getDocs.size !== 0) {
        // delete all docs inside collection.
        // it causes the collection was deleted.
        getDocs.forEach((eachDoc) => {
          eachDoc.ref.delete();
        });
        // console.log("Deleting collection successfully.");
        this.setResult("Deleting collection successfully.", true);
      }
    } catch (error) {
      // console.log("Error in deleting collection", error);
      this.setResult("Error in deleting collection.");
    }
    return this.getResult();
  }

  async onDeleteSpecificDoc(
    collectionName: string,
    docId: string
  ): Promise<IResult> {
    try {
      await firestore()
        .collection(collectionName)
        .doc(docId)
        .delete()
        .then((response) => {
          // console.log({ response });
          this.setResult("doc deleted!", true);
        })
        .catch((error) => {
          // console.log({ error });
          this.setResult("error in deleting doc");
        });
    } catch (error) {
      // console.log(error);
    }

    return this.getResult();
  }

  async getSpecificDocById(
    collectionName: string,
    docId: string
  ): Promise<FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null> {
    let response: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null =
      null;

    try {
      await firestore()
        .collection(collectionName)
        .doc(docId)
        .get()
        .then(
          (
            res: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
          ) => {
            // console.log({ response });
            response = res;
          }
        )
        .catch((error) => {
          // console.log("error in get specific doc: ", error);
        });
    } catch (error) {
      // console.log({ error });
    }
    return response;
  }

  async getAllDocsOfCollection(
    collectionName: string
  ): Promise<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  > {
    let response: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[] =
      [];
    try {
      let allDocs = await firestore().collection(collectionName).get();
      // console.log("Total collection size: ", allDocs.size);

      if (allDocs.size !== 0) {
        allDocs.forEach((eachDoc) => {
          response.push(eachDoc);
        });
      }
    } catch (error) {
      // console.log({ error });
    }

    return response ?? [];
  }

  async onUpdateDocValue(
    collectionName: string,
    docId: string,
    fields: {}
  ): Promise<IResult> {
    // updating deeply nested values via dot-notation.
    try {
      firestore()
        .collection(collectionName)
        .doc(docId)
        .update(fields)
        .then((response) => {
          // console.log({response})
          this.setResult("Field updated!", true);
        })
        .catch((error) => {
          // console.log({error})
          this.setResult("Error in updating field.");
        });
    } catch (error) {
      // console.log({ error });
    }

    return this.getResult();
  }

  private setResult(msg: string, status: boolean = false) {
    this._result = { msg, status };
  }

  private getResult() {
    return this._result;
  }
}

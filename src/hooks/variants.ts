import { Variant } from "../models/Variant";
import { collection, doc, query, where } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";

export function useGlobalVariants(): [
  Variant[],
  boolean,
  FirebaseError | undefined
] {
  const [variants, setVariants] = useState<Variant[]>([]);
  const ref = query(
    collection(firestore, "variants"),
    where("visibility", "==", "public")
  );
  const [variantsSnapshot, loading, error] = useCollection(ref);

  useEffect(() => {
    if (variantsSnapshot && variantsSnapshot.docs) {
      setVariants(
        variantsSnapshot.docs.map((doc: any) => doc.data() as Variant)
      );
    }
  }, [variantsSnapshot]);

  return [variants, loading, error];
}

export function useVariant(
  variantId: string
): [Variant | undefined, boolean, FirebaseError | undefined] {
  const [value, loading, error] = useDocumentData(
    doc(firestore, `variants/${variantId}`)
  );

  return [value as Variant, loading, error];
}

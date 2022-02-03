import React from "react";
import { QiitaList } from "../templates";
import { SWRConfig } from "swr";
import { fetchQiitaList } from "../lib/api/fetchData";

type Props = {
  [key: string]: object;
};

const QiitaListPage: React.FC<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <QiitaList />
    </SWRConfig>
  );
};

export default QiitaListPage;

export const getStaticProps = async () => {
  const qiitaList = await fetchQiitaList();
  return {
    props: {
      fallback: {
        "/qiitaList": qiitaList,
      },
    },
  };
};

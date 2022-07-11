import React from "react";

export interface DataType {
    key: React.Key;
    name: string;
    _id: string;
    parents: {
      name: string
      _id: string;
      __v: number
    };
}
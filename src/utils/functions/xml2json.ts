
import * as xml2js from 'xml2js';

export async function parseXmlToJson(xmlData: string): Promise<any> {
  const parser = new xml2js.Parser({ explicitArray: false });
  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function transformResponse(response: any): any {
  console.log(response.root.xml_datos_padron.r);

  const rArray = Array.isArray(response.root.xml_datos_padron.r)
      ? response.root.xml_datos_padron.r
      : [response.root.xml_datos_padron.r];

  const _ = rArray.map((item: any) => {
    const {
      CODIGO_MODULAR,
      DRE,
      NOMBRE_DRE,
      UGEL,
      NOMBRE_UGEL,
      DEPARTAMENTO,
      PROVINCIA,
      DISTRITO,
      ANEXO,
      NOMBRE_IE,
      NIVEL,
      NOMBRE_NIVEL,
    } = item.$;

    return {
      CODIGO_MODULAR,
      DRE,
      NOMBRE_DRE,
      UGEL,
      NOMBRE_UGEL,
      DEPARTAMENTO,
      PROVINCIA,
      DISTRITO,
      ANEXO,
      NOMBRE_IE,
      NIVEL,
      NOMBRE_NIVEL,
    };
  });

  return _;
}

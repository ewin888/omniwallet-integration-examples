export const messages = {
 en:{checking:'Checking synthetic signature…',valid:'Signature matches',invalid:'Signature rejected',unavailable:'Interactive mode unavailable',bytes:n=>`${n} UTF-8 bytes`,explanations:null},
 ja:{checking:'サンプルの署名を検証しています…',valid:'署名が一致しました',invalid:'署名が一致しません',unavailable:'対話機能を利用できません',error:'HTTPS と Web Crypto に対応したブラウザーが必要です。代わりに Node.js のオフライン実験を利用できます。',bytes:n=>`UTF-8 で ${n} バイト`,explanations:{
 original:'元の UTF-8 バイト列と署名が一致します。ただし、署名が正しくても決済完了とは限りません。注文内容や金額などの業務上の確認が別途必要です。',
 format:'JSON の値は同じでも、空白や改行により署名対象のバイト列が変わっています。JSON を解析する前に、受信した元の本文を保持してください。',
 amount:'金額を書き換えた本文に、変更前の署名を付けています。この組み合わせは署名検証で拒否されます。',
 updated:'正しいシークレットを持つ送信者が更新後の本文に署名すると、署名は一致します。それでも決済完了の証明ではありません。注文、金額、通貨、ネットワーク、正式な決済状態を確認してください。'
 }}
};

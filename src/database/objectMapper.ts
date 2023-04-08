
export function ObjMapper(data: any) {
  return data.map((d: any) => {
    const transformed = d?.toObject();
    transformed._id = transformed._id.toString();
    transformed.createdAt = transformed.createdAt.toString() ?? '';
    transformed.updatedAt = transformed?.updatedAt?.toString() ?? '';
    return transformed;
  });
}

export function ObjMapperSingle(d: any) {
  if (d) {
    const transformed = d?.toObject();
    transformed._id = transformed._id.toString();
    transformed.createdAt = transformed.createdAt?.toString() ?? "";
    transformed.updatedAt = transformed.updatedAt?.toString() ?? "";
    return transformed;
  }

}

export function ChannelObjMapper(d: any) {
  const transformed = d.toObject();
  transformed._id = transformed._id.toString();
  // transformed.name = transformed.name.toString();
  // transformed.avatarURL = transformed.avatarURL.toString();
  // transformed.cartegory = transformed.cartegory.toString();
  transformed.updatedAt = transformed.updatedAt.toString();
  transformed.createdAt = transformed.createdAt.toString();
  return transformed;
}

//                                                            0
const a = ('' || null || 0 || -0 || undefined) ?? (null || 0) ?? '' ?? null;

console.log(a);

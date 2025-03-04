export const getErrorMessages = (vuelidate: any, propName: string) => {
  return vuelidate[propName].$errors?.map((error: any) => error.$message)
}

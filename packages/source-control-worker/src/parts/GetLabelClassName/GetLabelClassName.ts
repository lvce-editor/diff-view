import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const classNameDefault = MergeClassNames.mergeClassNames(ClassNames.Label, ClassNames.Grow)
const classNameStrikeThrough = MergeClassNames.mergeClassNames(classNameDefault, ClassNames.StrikeThrough)

export const getLabelClassName = (decorationStrikeThrough: boolean): string => {
  if (decorationStrikeThrough) {
    return classNameStrikeThrough
  }
  return classNameDefault
}

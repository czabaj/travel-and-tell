import * as R from "ramda"
import {
  isArray,
  isNonEmptyString,
  isObj,
  isString,
  noop,
  omitBy,
} from "ramda-adjunct"

const whenNotEmpty = fn => R.ifElse(R.isEmpty, noop, fn)
const keysOfTruthyValues = R.pipe(omitBy(R.complement(Boolean)), R.keys)

/**
 * classnames like utility
 * @see https://github.com/JedWatson/classnames
 */
export const cn = R.unapply(
  R.pipe(
    R.transduce(
      R.compose(
        R.map(
          R.cond([
            [isString, R.identity],
            [
              isObj,
              R.pipe(
                keysOfTruthyValues,
                whenNotEmpty(keys => cn(...keys)),
              ),
            ],
            [isArray, whenNotEmpty(arr => cn(...arr))],
          ]),
        ),
        R.filter(isNonEmptyString),
        R.map(R.trim),
      ),
      R.flip(R.append),
      [],
    ),
    R.join(` `),
  ),
)

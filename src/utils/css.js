import * as R from "ramda"

const { isArray } = Array
const isString = R.is(String)
const isNonEmptyString = R.allPass([R.complement(R.isEmpty), isString])
const isObj = R.is(Object)

const whenNotEmpty = fn => R.unless(R.isEmpty, fn)
const keysOfTruthyValues = obj =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => (value && acc.push(key), acc),
  )

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

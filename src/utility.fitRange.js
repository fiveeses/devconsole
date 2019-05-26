// NO DEPENDENCIES
/**
 * Adjusts the given value "num" into the range [min,max].
 * @param {number} num Value to ajust into the range.
 * @param {number} max High-end of the acceptable range.
 * @param {number|undefined} min (Optional) Low-end of the acceptable range. Defaults to 0.
 * @remark When max = min, max will be returned.
 * @remark When max < min, min and max will be swapped.
 */
export default function fitRange(
   num, 
   max,
   min = 0
) {
   let val;
   if (min === max) {
      val = max;
   } else {
      let adj = 0;
      if (min > max) {
         val = min;
         min = max;
         max = val;
      }
      val = num;
      if (min !== 0) {
         adj = min;
         min -= adj;
         max -= adj;
         val -= adj;
      }
      while (val < 0) { val += max; };
      val %= max;
      val += adj;
   }
   return val;
};

// eof
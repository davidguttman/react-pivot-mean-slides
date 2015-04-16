* Built using React, but can be used via vanilla JS
* Executive/manager/analyst want access to data
* Show basic table that solves base case
  * Columns need to be "normal": no camelCase, snake_case, support special characters
  * Cell formatting should be configurable, handle money, add commas to large numbers
  * Sorting -- but has to handle the formatting (10 < 2?)
  * Pagination

* Computed columns
  * computed columns need to obey sorting
  * links as formatting using other row data
  * styling: red/green depending on value
  * column classes -- right align numbers

* Grouping
  * not all columns make sense as a sum: need to do an average
  * existing computed columns need to be redone: can't sum averages/ctr etc...
  * can now add additional "average" columns that only make sense for groups

* Show column hiding
* CSV Export

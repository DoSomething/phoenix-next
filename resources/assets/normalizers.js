/**
 * Create normalized entities from the reportback response.
 * @returns {Object}
 * @param data
 */
export function normalizeReportbacksResponse(data) {
  let reportbacks = {};
  let reportbackItems = {};

  data.forEach((reportback) => {
    reportback.reportback_items = reportback.reportback_items.data.map((item) => {
      const currentUser = item.kudos.data[0] ? item.kudos.data[0].current_user : false;

      item.reaction = {
        id: currentUser ? currentUser.kudos_id : null,
        reacted: !!(currentUser && currentUser.kudos_id),
        total: item.kudos.data[0] ? item.kudos.data[0].term.total : 0,
        termId: item.kudos.data[0] ? item.kudos.data[0].term.id : '1274', // This is a hardcoded default because phoenix-ashes is bugged.
      };
      delete item.kudos;

      reportbackItems[item.id] = item;
      return item.id;
    });

    delete reportback.campaign;
    reportbacks[reportback.id] = reportback;
  });

  return {reportbacks, reportbackItems};
}

/**
 * Create normalized entities from the reportback item response.
 * @param  {Object} data
 * @return {Object}
 */
export function normalizeReportbackItemResponse(data) {
  let reportbacks = {};
  let reportbackItems = {};

  data.forEach((reportbackItem) => {
    const kudos = reportbackItem.kudos.data[0];
    const currentUser = kudos ? kudos.current_user : false;

    reportbackItem.reaction = {
      id: currentUser ? currentUser.kudos_id : null,
      reacted: !!(currentUser && currentUser.kudos_id),
      total: kudos ? kudos.term.total : 0,
      termId: kudos ? kudos.term.id : '1274', // This is a hardcoded default because phoenix-ashes is bugged.
    };

    const reportback = reportbackItem.reportback;
    let existingReportback = reportbacks[reportback.id];

    if (! existingReportback) {
      existingReportback = reportback;
      reportbacks[reportback.id] = existingReportback;
    }

    if (! existingReportback.reportback_items) {
      existingReportback.reportback_items = []; // Underscore naming b/c of old data format.
    }

    existingReportback.reportback_items.push(reportbackItem.id);

    if (! existingReportback.user) {
      existingReportback.user = reportbackItem.user;
    }

    delete reportbackItem.campaign;
    reportbackItems[reportbackItem.id] = reportbackItem;
  });

  return { reportbacks, reportbackItems };
}

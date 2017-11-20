import { createSelector } from 'reselect';

export const customOfflineSelector = state => state.customOffline;
export const offlineSelector = state => state.offline;
export const outboundSelector = state => state.outbound;

export const offlineOutboxSelector = createSelector(
  [offlineSelector],
  (offline) => offline.outbox
);

export const offlineRetrySelector = createSelector(
  [offlineSelector],
  (offline) => offline.retryCount
)

export const outboundFailedSelector = createSelector(
  [outboundSelector],
  (outbound) => outbound.failedRequests
)
- Current:
  nohup anvil --block-time 1 --silent >/tmp/anvil.log 2>&1 &

  With persistence:
  mkdir -p /tmp/anvil-state
  nohup anvil --block-time 1 --silent --dump-state
  /tmp/anvil-state/state.json >/tmp/anvil.log 2>&1 &

  To restart with same state later:
  nohup anvil --block-time 1 --silent --load-state
  /tmp/anvil-state/state.json --dump-state /tmp/anvil-state/state.json
  >/tmp/anvil.log 2>&1 &
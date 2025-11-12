experiment="demo2"
SEQUENCES=("male-3-casual")
for SEQUENCE in ${SEQUENCES[@]}; do
    dataset="peoplesnapshot/$SEQUENCE"
    bash scripts/custom/process-sequence.sh ./data/PeopleSnapshot/$SEQUENCE neutral
    python train.py --config-name demo dataset=$dataset experiment=$experiment train.precision=16
    python novel_view.py --config-name demo dataset=$dataset experiment=$experiment
    python animate.py --config-name demo dataset=$dataset experiment=$experiment
done

export enum Route {
  Exercises = '/exercises',
  Exercise = '/exercises/[exerciseId]',
  Routines = '/routines',
  Routine = '/routines/[routineId]',
  RoutineWorkout = '/routines/[routineId]/workouts/[workoutId]',
  RoutineWorkoutExercise = '/routines/[routineId]/workouts/[workoutId]/exercises/[exerciseId]',
  Login = '/login',
}

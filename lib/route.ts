export enum Route {
  Exercises = '/exercises',
  Exercise = '/exercises/[exerciseId]',
  ExerciseLogs = '/exerciselogs',
  ExerciseLogNew = '/exerciselogs/new',
  ExerciseLog = '/exerciselogs/[exerciseLogId]',
  Signup = '/signup',
  Routines = '/routines',
  Routine = '/routines/[routineId]',
  RoutineWorkout = '/routines/[routineId]/workouts/[workoutId]',
  RoutineWorkoutExercise = '/routines/[routineId]/workouts/[workoutId]/exercises/[exerciseId]',
  Login = '/login',
}

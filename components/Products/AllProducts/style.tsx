import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 70,
    paddingTop: 36,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28, // base = text-3xl
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    maxWidth: 600,
    fontWeight: '300',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productWrapper: {
    marginHorizontal: 2,
  },
  noProductContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    gap: 16,
    marginTop: 8,
  },
  contentLg: {
    flex: 3, // like lg:w-3/4
  },
  contentSm: {
    width: '100%',
    marginTop: 16,
  },
});

export default styles;

# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: object_detection/protos/matcher.proto
# Protobuf Python Version: 4.25.2
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from object_detection.protos import argmax_matcher_pb2 as object__detection_dot_protos_dot_argmax__matcher__pb2
from object_detection.protos import bipartite_matcher_pb2 as object__detection_dot_protos_dot_bipartite__matcher__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n%object_detection/protos/matcher.proto\x12\x17object_detection.protos\x1a,object_detection/protos/argmax_matcher.proto\x1a/object_detection/protos/bipartite_matcher.proto\"\xa4\x01\n\x07Matcher\x12@\n\x0e\x61rgmax_matcher\x18\x01 \x01(\x0b\x32&.object_detection.protos.ArgMaxMatcherH\x00\x12\x46\n\x11\x62ipartite_matcher\x18\x02 \x01(\x0b\x32).object_detection.protos.BipartiteMatcherH\x00\x42\x0f\n\rmatcher_oneof')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'object_detection.protos.matcher_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_MATCHER']._serialized_start=162
  _globals['_MATCHER']._serialized_end=326
# @@protoc_insertion_point(module_scope)
